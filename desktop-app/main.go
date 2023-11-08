package main

import (
	"embed"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/user"
	"path/filepath"
	"runtime"
	"time"

	"github.com/go-gl/glfw/v3.3/glfw"
	"github.com/gofiber/fiber/v2"
	webview "github.com/webview/webview_go"
)

const (
	WEB_ASSETS string = "web_assets"
	// PORT       int    = 3000
)

func getConfigDirectory(appName string) string {
	usr, err := user.Current()
	if err != nil {
		panic(err)
	}

	var configDir string

	switch runtime.GOOS {
	case "windows":
		configDir = filepath.Join(usr.HomeDir, "AppData", "Roaming", appName)
	case "darwin":
		configDir = filepath.Join(usr.HomeDir, "Library", "Application Support", appName)
	case "linux":
		configDir = filepath.Join(usr.HomeDir, ".config", appName)
	default:
		// fallback to home directory
		configDir = filepath.Join(usr.HomeDir, "."+appName)
	}

	// Check if the directory exists
	if _, err := os.Stat(configDir); os.IsNotExist(err) {
		// Create the directory and any missing parent directories
		err := os.MkdirAll(configDir, 0755)
		if err != nil {
			panic(err)
		}
	}

	return configDir
}

//go:embed all:web_assets/*
var assets embed.FS

func Server(port int) error {

	app := fiber.New()

	// time.Sleep(time.Second * 5)

	app.Get("/healthcheck", func(c *fiber.Ctx) error {
		return c.SendStatus(200)
	})

	app.Get("/*", func(c *fiber.Ctx) error {
		file := c.Params("*", "index.html")
		b, err := assets.ReadFile(fmt.Sprintf("%s/%s", WEB_ASSETS, file))
		if err != nil {
			file = file + ".html"
			b, err = assets.ReadFile(fmt.Sprintf("%s/%s", WEB_ASSETS, file))
			if err != nil {
				return err
			}
		}

		ext := filepath.Ext(file)
		mimeType := http.DetectContentType(b)

		if ext != "" {
			// MIME type mapping
			mimeTypes := map[string]string{
				".html": "text/html",
				".css":  "text/css",
				".js":   "application/javascript",
				".ttf":  "font/ttf",
			}
			if val, exists := mimeTypes[ext]; exists {
				mimeType = val
			}
		}

		c.Set(fiber.HeaderContentType, mimeType)

		return c.Send(b)
	})

	if err := app.Listen(fmt.Sprintf(":%d", port)); err != nil {
		return err
	}

	return nil
}

func main() {
	configDir := getConfigDirectory("typing-guru")
	// port := rand.Intn(1000) + 3000
	port := 4000

	go func() {
		if err := Server(port); err != nil {
			panic(err)
		}
	}()

	w := webview.New(false)
	defer w.Destroy()

	w.SetTitle("Typing Guru")

	if err := glfw.Init(); err != nil {
		panic(err)
	}
	defer glfw.Terminate()

	vidMode := glfw.GetPrimaryMonitor().GetVideoMode()

	w.SetSize(vidMode.Width, vidMode.Height, webview.HintNone)

	for {
		r, err := http.Get(fmt.Sprintf("http://localhost:%d/healthcheck", port))
		if err == nil && r.StatusCode == 200 {
			log.Println("server is live.")
			break
		}
		log.Println("Waiting for server...")
		time.Sleep(time.Second)
	}

	w.Bind("config", func() string {
		b, err := os.ReadFile(fmt.Sprintf("%s/%s", configDir, "config.json"))
		if err != nil {
			log.Println(err)
			return ""
		}
		return string(b)
	})

	w.Bind("setConfig", func(config string) error {
		err := os.WriteFile(fmt.Sprintf("%s/%s", configDir, "config.json"), []byte(config), 0644)
		if err != nil {
			log.Println(err)
			return err
		}
		return nil
	})

	w.Navigate(fmt.Sprintf("http://localhost:%d", port))
	w.Run()
}
