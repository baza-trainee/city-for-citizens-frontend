import { useEffect, useState } from 'react';

const FilterInputWrapper = ({
  label,
  inputTextDefault,
  inputText,
  children,
  iconSelect: IconSelect,
  iconReset: IconReset,
  handleResetButton,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);

  useEffect(() => {
    setHasFocus(inputText ? true : false);
  }, [inputText]);

  const handleInputClick = () => {
    if (hasFocus) {
      setIsVisible(false);
      setHasFocus(false);
    } else {
      setHasFocus(true);
      setIsVisible(true);
    }
  };

  const handleContentClick = () => {
    setHasFocus(true);
  };

  const handleLostFocus = () => {
    setIsVisible(false);
    setHasFocus(false);
  };

  const handleFocus = () => {
    setIsVisible(true);
  };

  const handleMouseHover = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    if (hasFocus) {
      return;
    }
    setIsVisible(false);
  };

  const setColor = inputText
    ? isVisible
      ? 'gray/100'
      : 'gray/50'
    : isVisible
    ? 'gray/100'
    : 'gray/30';

  const setColorDark = inputText
    ? isVisible
      ? 'gray/5'
      : 'gray/10'
    : isVisible
    ? 'gray/5'
    : 'gray/20';

  const setClassNameIcon = `cursor-pointer transition-all  stroke-${setColor} dark:stroke-${setColorDark}`;

  return (
    <div className="relative">
      <p className="mb-[8px] text-[14px] leading-[1.5] -tracking-[0.154px] text-gray/100 dark:text-gray/5">
        {label}
      </p>
      <div
        tabIndex="0"
        onFocus={handleFocus}
        onBlur={handleLostFocus}
        onMouseEnter={handleMouseHover}
        onMouseLeave={handleMouseLeave}
      >
        <div
          onClick={handleInputClick}
          className={`flex h-[44px] w-[164px] gap-[5px] rounded-[8px] border-[1px] p-[10px] transition-all ${
            isVisible
              ? 'rounded-bl-none rounded-br-none border-gray/80 dark:border-gray/5'
              : 'border-gray/20'
          }`}
        >
          <p
            className={`select-none leading-[1.5] -tracking-[0.176px] truncate max-w-[113px] text-[16px] whitespace-nowrap text-${setColor} dark:text-${setColorDark}`}
          >
            {inputTextDefault || inputText}
          </p>
          {IconSelect && (
            <IconSelect
              className={`${setClassNameIcon} ${isVisible && '-rotate-180'}`}
            />
          )}

          {IconReset && inputText && (
            <IconReset
              onClick={handleResetButton}
              className={`${setClassNameIcon} ml-auto hover:-rotate-180`}
            />
          )}
        </div>
        <div
          onClick={handleContentClick}
          className={`absolute z-10 w-full rounded-bl-[8px] rounded-br-[8px] border-[1px] border-t-0 border-gray/100 bg-gray/5  transition-all dark:border-gray/5 dark:bg-gray/100 ${
            isVisible ? 'visible opacity-100' : 'invisible opacity-0'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
export default FilterInputWrapper;