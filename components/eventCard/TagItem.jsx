const TagItem = ({ tagMassage }) => {
  return (
    <div className="rounded-[8px] border border-gray/100 px-[10px] py-[8px] text-[12px] text-gray/100 dark:border-gray/5 dark:text-gray/5">
      {tagMassage}
    </div>
  );
};

export default TagItem;
