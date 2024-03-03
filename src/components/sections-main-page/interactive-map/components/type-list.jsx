import clsx from 'clsx';

export function TypeList({ eventTypes, className }) {
  return (
    <ul className={`${clsx('flex gap-2', className)}`}>
      {eventTypes.map(({ id, idIdentifier, eventType }) => (
        <li
          className="rounded-lg border border-light-border px-2 py-1 dark:border-dark-border"
          key={id + idIdentifier}
        >
          <div className="text-light-main dark:text-dark-main">{eventType}</div>
        </li>
      ))}
    </ul>
  );
}
