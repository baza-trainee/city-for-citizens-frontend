import { EventCard } from './components/event-card';
import { HoverEventCard } from './components/hover-event-card';

export function InteractiveMap() {
  return (
    <section
      id="map"
      className="flex h-[745px] items-center justify-center gap-4 bg-black/40"
    >
      <div>InteractiveMap</div>
      <HoverEventCard />
      <EventCard />
    </section>
  );
}
