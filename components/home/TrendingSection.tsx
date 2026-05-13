import StoryCard from "./StoryCard";

interface Story {
  _id: string;
  title: string;
  image: string;
  content: string;
  likes: string[];
  comments: string[];
  user?: {
    username?: string;
  };
}

interface TrendingSectionProps {
  stories: Story[];
}

export default function TrendingSection({
  stories,
}: TrendingSectionProps) {
  return (
    <section>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <h3 className="text-2xl font-bold">

          Trending Now
        </h3>

        <button className="text-[#ddb7ff]">

          View All
        </button>
      </div>

      {/* STORIES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {stories.length > 0 ? (

          stories.map((story) => (

            <StoryCard
              key={story._id}
              _id={story._id}
              title={story.title}
              image={story.image}
              category="Story"
              author={
                story.user?.username ||
                "Storyverse Creator"
              }
              content={story.content}
              likes={story.likes || []}
              comments={
                story.comments || []
              }
            />
          ))

        ) : (

          <div className="text-[#cdc3d0] text-sm">

            No stories available
          </div>
        )}
      </div>
    </section>
  );
}