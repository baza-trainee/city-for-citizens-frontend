const TagList = ({ tagMassage }) => {
  return (
    <div className="inline-block p-2.5 mr-2 last:mr-0 border rounded-lg text-xs border-gray/100 text-gray/100 dark:text-gray/5 dark:border-gray/5">
      {tagMassage}
    </div>
  );
};

export default TagList;
