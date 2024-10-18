import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

const GalleryPage = () => {
  return (
    <div className="py-8">
      <h1 className="text-center text-3xl font-bold mb-6">Image Gallery</h1>
      <BentoGrid>
        {/* Wider item */}
        <BentoGridItem
          className="md:col-span-2"
          imageSrc="https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
          altText="Beautiful Landscape"
        />
        {/* Smaller item */}
        <BentoGridItem
          className="md:col-span-1"
          imageSrc="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
          altText="City at Night"
        />
        {/* Full-width item */}
        <BentoGridItem
          className="md:col-span-3"
          imageSrc="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
          altText="Mountain View"
        />
        {/* Narrower item */}
        <BentoGridItem
          className="md:col-span-1"
          imageSrc="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
          altText="Ocean Sunset"
        />
        {/* Medium-width item */}
        <BentoGridItem
          className="md:col-span-2"
          imageSrc="https://images.unsplash.com/photo-1519304980695-2f8a8f0c40b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
          altText="Forest Path"
        />
        {/* Full-width item */}
        <BentoGridItem
          className="md:col-span-3"
          imageSrc="https://images.unsplash.com/photo-1503264116251-35a269479413?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
          altText="Desert Dunes"
        />
      </BentoGrid>
    </div>
  );
};

export default GalleryPage;
