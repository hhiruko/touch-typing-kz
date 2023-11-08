import React, { useEffect, useState } from 'react';
import Key, { IKey } from './key';
import Hand from './hand';

interface KeyboardProps {
  activeKey: IKey | null;

  wrongKey: IKey | null;
  className?: string;
  showHand?: boolean;
}

function Keyboard({
  activeKey: aKey,
  wrongKey: wKey = null,
  className,
  showHand,
}: KeyboardProps) {
  const [activeKey, setactiveKey] = useState<IKey | null>(null);

  const [wrongKey, setwrongKey] = useState<IKey | null>(null);
  useEffect(() => {
    setactiveKey(aKey);
    setwrongKey(wKey);
  }, [aKey, wKey]);

  const keylist: {
    id: string;
    keys: React.ReactNode;
    className: string;
    keyMatch?: (string | number)[];
    keyMatchFun?: (key: IKey) => boolean;
  }[] = [
    {
      id: '1',
      keys: <>Esc</>,
      className: 'key function space1',
      keyMatch: ['Escape'],
    },
    {
      id: '2',
      keys: <>F1</>,
      className: 'key function',
      keyMatch: ['F1'],
    },
    {
      id: '3',
      keys: <>F2</>,
      className: 'key function',
      keyMatch: ['F2'],
    },
    {
      id: '4',
      keys: <>F3</>,
      className: 'key function',
      keyMatch: ['F3'],
    },
    {
      id: '5',
      keys: <>F4</>,
      className: 'key function space2',
      keyMatch: ['F4'],
    },
    {
      id: '6',
      keys: <>F5</>,
      className: 'key function',
      keyMatch: ['F5'],
    },
    {
      id: '7',
      keys: <>F6</>,
      className: 'key function',
      keyMatch: ['F6'],
    },
    {
      id: '8',
      keys: <>F7</>,
      className: 'key function',
      keyMatch: ['F7'],
    },
    {
      id: '9',
      keys: <>F8</>,
      className: 'key function space2',
      keyMatch: ['F8'],
    },
    {
      id: '10',
      keys: <>F9</>,
      className: 'key function',
      keyMatch: ['F9'],
    },
    {
      id: '11',
      keys: <>F10</>,
      className: 'key function',
      keyMatch: ['F10'],
    },
    {
      id: '12',
      keys: <>F11</>,
      className: 'key function',
      keyMatch: ['F11'],
    },
    {
      id: '13',
      keys: <>F12</>,
      className: 'key function',
      keyMatch: ['F12'],
    },

    {
      id: '14',
      keys: (
        <>
          )<br />
          &nbsp;&nbsp;&nbsp;(
        </>
      ),
      className: 'key num dual',
      keyMatch: ['(', ')'],
    },
    {
      id: '15',
      keys: (
        <>
          !<br />
          &nbsp;&nbsp;&nbsp;"
        </>
      ),
      className: 'key num dual',
      keyMatch: ['"', '!'],
    },
    {
      id: '16',
      keys: (
        <>
          Ә<br />
          &nbsp;&nbsp;&nbsp;ә
        </>
      ),
      className: 'key num dual',
      keyMatch: ['ә', 'Ә'],
    },
    {
      id: '17',
      keys: (
        <>
          І<br />
          &nbsp;&nbsp;&nbsp;і
        </>
      ),
      className: 'key num dual',
      keyMatch: ['і', 'І'],
    },
    {
      id: '18',
      keys: (
        <>
          Ң<br />
          &nbsp;&nbsp;&nbsp;ң
        </>
      ),
      className: 'key num dual',
      keyMatch: ['ң', 'Ң'],
    },
    {
      id: '19',
      keys: (
        <>
          Ғ<br />
          &nbsp;&nbsp;&nbsp;ғ
        </>
      ),
      className: 'key num dual',
      keyMatch: ['ғ', 'Ғ'],
    },
    {
      id: '20',
      keys: (
        <>
          ;<br />
          &nbsp;&nbsp;&nbsp;,
        </>
      ),
      className: 'key num dual',
      keyMatch: [',', ';'],
    },
    {
      id: '21',
      keys: (
        <>
          :
          <br />
          &nbsp;&nbsp;&nbsp;.
        </>
      ),
      className: 'key num dual',
      keyMatch: ['.', ':'],
    },
    {
      id: '22',
      keys: (
        <>
          Ү<br />
          &nbsp;&nbsp;&nbsp;ү
        </>
      ),
      className: 'key num dual',
      keyMatch: ['ү', 'Ү'],
    },
    {
      id: '23',
      keys: (
        <>
          Ұ
          <br />
          &nbsp;&nbsp;&nbsp;ұ
        </>
      ),
      className: 'key num dual',
      keyMatch: ['ұ', 'Ұ'],
    },
    {
      id: '24',
      keys: (
        <>
          Қ
          <br />
          &nbsp;&nbsp;&nbsp;қ
        </>
      ),
      className: 'key num dual',
      keyMatch: ['қ', 'Қ'],
    },
    {
      id: '25',
      keys: (
        <>
          Ө<br />
          &nbsp;&nbsp;&nbsp;ө
        </>
      ),
      className: 'key num dual',
      keyMatch: ['ө', 'Ө'],
    },

    {
      id: '26',
      keys: (
        <>
          Һ<br />
          &nbsp;&nbsp;&nbsp;һ
        </>
      ),
      className: 'key num dual',
      keyMatch: ['һ', 'Һ'],
    },
    {
      id: '27',
      keys: <>Backspace </>,
      className: 'key backspace',
      keyMatch: ['Backspace'],
    },
    {
      id: '28',
      keys: <>Tab </>,
      className: 'key tab',
      keyMatch: ['Tab'],
    },
    {
      id: '29',
      keys: (
        <>
          Й <br />
          &nbsp;&nbsp;&nbsp;й
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['й', 'Й'],
    },
    {
      id: '30',
      keys: (
        <>
          Ц <br />
          &nbsp;&nbsp;&nbsp;ц
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['ц', 'Ц'],
    },
    {
      id: '31',
      keys: (
        <>
          У <br />
          &nbsp;&nbsp;&nbsp;у
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['у', 'У'],
    },
    {
      id: '32',
      keys: (
        <>
          К <br />
          &nbsp;&nbsp;&nbsp;к
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['к', 'К'],
    },
    {
      id: '33',
      keys: (
        <>
          Е <br />
          &nbsp;&nbsp;&nbsp;е
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['е', 'Е'],
    },
    {
      id: '34',
      keys: (
        <>
          Н <br />
          &nbsp;&nbsp;&nbsp;н
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['н', 'Н'],
    },
    {
      id: '35',
      keys: (
        <>
          Г <br />
          &nbsp;&nbsp;&nbsp;г
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['г', 'Г'],
    },
    {
      id: '36',
      keys: (
        <>
          Ш <br />
          &nbsp;&nbsp;&nbsp;ш
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['ш', 'Ш'],
    },
    {
      id: '37',
      keys: (
        <>
          Щ <br />
          &nbsp;&nbsp;&nbsp;щ
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['щ', 'Щ'],
    },
    {
      id: '38',
      keys: (
        <>
          З <br />
          &nbsp;&nbsp;&nbsp;з
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['з', 'З'],
    },

    {
      id: '39',
      keys: (
        <>
          Х <br />
          &nbsp;&nbsp;&nbsp;х
        </>
      ),
      className: 'key dual',
      keyMatch: ['х', 'Х'],
    },

    {
      id: '40',
      keys: (
        <>
          Ъ <br />
          &nbsp;&nbsp;&nbsp;ъ
        </>
      ),
      className: 'key dual',
      keyMatch: ['ъ', 'Ъ'],
    },

    {
      id: '41',
      keys: (
        <>
          \<br />
          &nbsp;&nbsp;&nbsp;/
        </>
      ),
      className: 'key letter dual slash',
      keyMatch: ['\\', '/'],
    },
    {
      id: '42',
      keys: (
        <>
          Caps
          <br />
          Lock
        </>
      ),
      className: 'key caps',
      keyMatch: ['CapsLock'],
    },
    {
      id: '43',
      keys: (
        <>
          Ф <br />
          &nbsp;&nbsp;&nbsp;ф
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['ф', 'Ф'],
    },
    {
      id: '44',
      keys: (
        <>
          Ы <br />
          &nbsp;&nbsp;&nbsp;ы
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['ы', 'Ы'],
    },
    {
      id: '45',
      keys: (
        <>
          В <br />
          &nbsp;&nbsp;&nbsp;в
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['в', 'В'],
    },
    {
      id: '46',
      keys: (
        <>
          А <br />
          &nbsp;&nbsp;&nbsp;а
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['а', 'А'],
    },
    {
      id: '47',
      keys: (
        <>
          П <br />
          &nbsp;&nbsp;&nbsp;п
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['п', 'П'],
    },
    {
      id: '48',
      keys: (
        <>
          Р <br />
          &nbsp;&nbsp;&nbsp;р
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['р', 'Р'],
    },
    {
      id: '49',
      keys: (
        <>
          О <br />
          &nbsp;&nbsp;&nbsp;о
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['о', 'О'],
    },
    {
      id: '50',
      keys: (
        <>
          Л <br />
          &nbsp;&nbsp;&nbsp;л
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['л', 'Л'],
    },
    {
      id: '51',
      keys: (
        <>
          Д <br />
          &nbsp;&nbsp;&nbsp;д
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['д', 'Д'],
    },
    {
      id: '52',
      keys: (
        <>
          Ж<br />
          &nbsp;&nbsp;&nbsp;ж
        </>
      ),
      className: 'key dual',
      keyMatch: ['ж', 'Ж'],
    },
    {
      id: '53',
      keys: (
        <>
          Э
          <br />
          э
        </>
      ),
      className: 'key dual',
      keyMatch: ['э', "Э"],
    },

    {
      id: '54',
      keys: <>Enter</>,
      className: 'key enter',
      keyMatch: ['Enter'],
    },

    {
      id: '55',
      keys: <>Shift</>,
      className: 'key shift left',
      keyMatch: ['Shift'],
      keyMatchFun: (acKey) => {
        return acKey?.shiftKey;
      },
    },
    {
      id: '56',
      keys: (
        <>
          Я <br />
          &nbsp;&nbsp;&nbsp;я
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['я', 'Я'],
    },
    {
      id: '57',
      keys: (
        <>
          Ч <br />
          &nbsp;&nbsp;&nbsp;ч
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['ч', 'Ч'],
    },
    {
      id: '58',
      keys: (
        <>
          С <br />
          &nbsp;&nbsp;&nbsp;с
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['с', 'С'],
    },
    {
      id: '59',
      keys: (
        <>
          М <br />
          &nbsp;&nbsp;&nbsp;м
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['м', 'М'],
    },
    {
      id: '60',
      keys: (
        <>
          И <br />
          &nbsp;&nbsp;&nbsp;и
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['и', 'И'],
    },
    {
      id: '61',
      keys: (
        <>
          Т <br />
          &nbsp;&nbsp;&nbsp;т
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['т', 'Т'],
    },
    {
      id: '62',
      keys: (
        <>
          Ь <br />
          &nbsp;&nbsp;&nbsp;ь
        </>
      ),
      className: 'key letter dual',
      keyMatch: ['ь', 'Ь'],
    },
    {
      id: '63',
      keys: (
        <>
          Б
          <br />
          &nbsp;&nbsp;&nbsp;б
        </>
      ),
      className: 'key dual',
      keyMatch: ['б', 'Б'],
    },
    {
      id: '64',
      keys: (
        <>
          Ю <br />
          &nbsp;&nbsp;&nbsp; ю
        </>
      ),
      className: 'key dual',
      keyMatch: ['ю', 'Ю'],
    },
    {
      id: '65',
      keys: (
        <>
          ? <br />
          &nbsp;&nbsp;&nbsp;№
        </>
      ),
      className: 'key dual',
      keyMatch: ['№', '?'],
    },

    {
      id: '66',
      keys: <>Shift</>,
      className: 'key shift right',
      keyMatch: ['Shift'],
      keyMatchFun: (acKey) => {
        return acKey?.shiftKey;
      },
    },
    {
      id: '67',
      keys: <>Ctrl</>,
      className: 'key ctrl',
      keyMatch: ['Control'],
      keyMatchFun: (acKey) => {
        return !!acKey?.ctrlKey;
      },
    },
    {
      id: '68',
      keys: <>Win</>,
      className: 'key',
    },
    {
      id: '69',
      keys: <>Alt</>,
      className: 'key',
      keyMatch: ['Alt'],
      keyMatchFun: (acKey) => {
        return !!acKey?.altKey;
      },
    },
    {
      id: '70',
      keys: '',
      className: 'key space',
      keyMatch: [' '],
    },
    {
      id: '71',
      keys: <>Alt</>,
      className: 'key',
      keyMatch: ['Alt'],
      keyMatchFun: (acKey) => {
        return !!acKey?.altKey;
      },
    },
    {
      id: '72',
      keys: <>Win</>,
      className: 'key',
    },
    {
      id: '73',
      keys: <>Fn</>,
      className: 'key',
    },

    {
      id: '74',
      keys: <>Ctrl</>,
      className: 'key ctrl',
      keyMatch: ['Control'],
      keyMatchFun: (acKey) => {
        return !!acKey?.ctrlKey;
      },
    },
  ];

  return (
    <section className="flex items-baseline w-full justify-center relative bottom-16">
      {showHand && <Hand activeKey={activeKey} wrongKey={wrongKey} leftHand />}
      <div>
        <div className={`keyboard ${className}`}>
          <div className="section-a">
            {keylist.map((item) => {
              return (
                <Key
                  key={`${item.id}-key`}
                  activeKey={activeKey}
                  wrongKey={wrongKey}
                  keys={item.keys}
                  className={item.className}
                  keyMatch={item.keyMatch}
                  keyMatchFun={item.keyMatchFun}
                />
              );
            })}
          </div>
        </div>
      </div>

      {showHand && <Hand activeKey={activeKey} wrongKey={wrongKey} rightHand />}
    </section>
  );
}

export default Keyboard;
