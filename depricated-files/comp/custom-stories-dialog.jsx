import { motion } from 'framer-motion';
import { createRef, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
// import OverlayMenu from 'overlaymenu';
import {
  configsContext,
  customStoriesContext,
} from '@commons/context/recoil-context';
import { FiEdit, FiTrash, FiX } from 'react-icons/fi';
import classNames from 'classnames';
import useForm from '@components/hooks/use-form';
import { usePersistentRecoilState } from '@components/hooks/use-recoil-presist';

const CustomStoriesDialog = ({ visible, setVisible }) => {
  const [configs, setConfigs] = usePersistentRecoilState(configsContext);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const [customStories, setCustomStories] =
    usePersistentRecoilState(customStoriesContext);

  const [values, errors, handleChange, handleSubmit, setValues] = useForm({
    initialValues: {
      name: '',
      story_text: '',
    },
    validationSchema: Yup.object({
      // define your schema here
      name: Yup.string()
        .required('Story Text is Required')
        .min(6, 'Name must be minimum 6 letter'),
      story_text: Yup.string()
        .required('Story Text is Required')
        .min(6, 'Story must be minimum 6 letter'),
    }),
    onSubmit: async (vals) => {
      // perform you submit action
      // console.log(vals);
      if (isUpdateMode) {
        const newCustomStories = customStories.map((stry) => {
          if (stry.id === values.id) {
            return {
              ...stry,
              name: vals.name,
              story_text: vals.story_text
                .replace(/(\r\n|\n|\r)/gm, ' ')
                .replaceAll('  ', ' '),
            };
          }
          return stry;
        });
        setCustomStories(newCustomStories);
        setIsUpdateMode(false);
      } else {
        setCustomStories((s) => [...s, { ...vals, id: Math.random() }]);
      }
      setValues({
        name: '',
        story_text: '',
      });
    },
  });

  const ref = useRef();
  useEffect(() => {
    setConfigs((s) => ({ ...s, isModalOpen: visible }));
  }, [visible]);

  useEffect(() => {
    if (visible && ref.current) {
      // @ts-ignore
      ref.current.focus();
    }
  }, [visible]);

  return (
    <OverlayMenu visible={visible} setVisible={setVisible} container_ref={ref}>
      <motion.div
        transition={{ duration: 0.2 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="flex justify-center items-center backdrop-blur-sm fixed w-full h-full z-20 bg-opacity-25 left-0 font-lato cursor-pointer"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          ref={ref}
          className="bg-white dark:bg-dark-background-keyboard flex flex-col w-[35rem] min-w-[13rem] cursor-auto rounded-md overflow-hidden shadow-xl relative bottom-20 max-w-[35rem]"
        >
          <div className="flex flex-col gap-3 p-6">
            <div className="flex justify-between items-center pb-4">
              <span className="font-semibold">Stories Setting</span>
              <div
                className="p-1 hover:bg-slate-200 rounded-full cursor-pointer"
                onClick={() => {
                  setVisible(false);
                }}
              >
                <FiX />
              </div>
            </div>
            <div className="shadow-sm border border-slate-100 rounded-sm ">
              <div className="flex flex-1 flex-col text-sm overflow-y-auto max-h-[10rem]">
                {customStories.length === 0 && (
                  <div className="flex justify-center items-center text-slate-400 py-8">
                    No Stories Present Now. Please Add Stories.
                  </div>
                )}
                {customStories.map((story, index) => {
                  const iRef = createRef();
                  const iRef2 = createRef();
                  return (
                    <div
                      key={story.id}
                      className={classNames(
                        'flex gap-6 p-2 hover:bg-slate-100 dark:hover:bg-[#141719] cursor-pointer rouded-sm',
                        {
                          'bg-slate-200 dark:bg-[#242729]':
                            configs.customStoryIndex === index,
                        }
                      )}
                      onClick={(e) => {
                        if (
                          e.target === iRef.current ||
                          e.target === iRef2.current ||
                          (iRef.current && iRef.current.contains(e.target)) ||
                          (iRef2.current && iRef2.current.contains(e.target))
                        ) {
                          return;
                        }
                        setConfigs((s) => ({ ...s, customStoryIndex: index }));
                        setVisible(false);
                      }}
                    >
                      <span className="truncate flex-1 flex items-center">
                        <span>{story.name}</span>
                      </span>
                      <span className="truncate flex-1 flex items-center">
                        <span className="truncate">{story.story_text}</span>
                      </span>
                      <div className="flex-1 flex gap-3 justify-end items-center">
                        <div
                          className="hover:bg-slate-300 p-1 rounded transition-all"
                          onClick={() => {
                            setIsUpdateMode(true);
                            setValues(story);
                          }}
                          ref={iRef}
                        >
                          <FiEdit />
                        </div>

                        <div
                          className="hover:bg-slate-300 p-1 rounded transition-all"
                          onClick={() => {
                            setCustomStories((s) =>
                              s.filter((st) => st.id !== story.id)
                            );
                          }}
                          ref={iRef2}
                        >
                          <FiTrash />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* <hr /> */}
            <div className="flex justify-between pt-4">
              <span className="font-semibold">Add Story</span>
            </div>
            <form
              className="flex flex-col text-sm gap-3"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-1">
                <span className="text-xs text-primary-300 font-bold">
                  {errors && errors.name ? (
                    <span className="text-red-500">{errors.name}</span>
                  ) : (
                    <span>Story Name</span>
                  )}
                </span>
                <input
                  value={values.name}
                  onChange={handleChange('name')}
                  placeholder="Story Name"
                  className="text-sm outline-none border rounded-sm p-2 focus:border-primary-300 dark:bg-dark-background"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-primary-300 font-bold">
                  {errors && errors.story_text ? (
                    <span className="text-red-500">{errors.story_text}</span>
                  ) : (
                    <span>Story Text</span>
                  )}
                </span>
                <textarea
                  value={values.story_text}
                  onChange={handleChange('story_text')}
                  placeholder="Story Name"
                  className="text-sm outline-none border rounded-sm p-2 focus:border-primary-300 dark:bg-dark-background"
                  rows={5}
                />
              </div>
              <div className="flex justify-end">
                <button className="py-2 border border-primary-500 dark:border-dark-primary-900 text-primary-500 dark:text-dark-primary-600 rounded-sm px-6 font-bold hover:bg-slate-100 dark:hover:bg-gray-800">
                  {isUpdateMode ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </OverlayMenu>
  );
};

export default CustomStoriesDialog;
