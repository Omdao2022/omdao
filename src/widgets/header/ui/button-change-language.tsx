import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

export const ButtonChangeLanguage: FC = () => {
  const { i18n } = useTranslation();
  const onClick = (): void => {
    if (i18n.language === 'ru') {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('ru');
    }
  };

  return (
    <button onClick={onClick}>
      <span
        className={classNames({
          'text-[#ffffff] font-medium': i18n.language === 'ru',
        })}
      >
        Ru&nbsp;
      </span>
      <span className="font-medium">|</span>
      <span
        className={classNames({
          'text-[#c1c1c1] font-medium': i18n.language === 'en',
        })}
      >
        &nbsp;En
      </span>
    </button>
  );
};
