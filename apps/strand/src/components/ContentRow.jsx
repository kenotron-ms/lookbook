import ContentCard from './ContentCard'

export default function ContentRow({ title, shows, progressMap, rankList, wide }) {
  return (
    <section style={{ marginBottom: '32px' }}>
      <h2 style={{
        fontSize: '18px',
        fontWeight: '700',
        color: '#e5e5e5',
        marginBottom: '12px',
        paddingLeft: '48px',
      }}>
        {title}
      </h2>
      <div
        className="carousel-row"
        style={{
          paddingLeft: '48px',
          paddingRight: '48px',
        }}
      >
        {shows.map((show, index) => {
          const rank = rankList ? rankList.indexOf(show.id) + 1 : null
          const progress = progressMap?.[show.id]
          return (
            <ContentCard
              key={show.id}
              show={show}
              progress={progress}
              rank={rank > 0 ? rank : null}
              wide={wide}
            />
          )
        })}
      </div>
    </section>
  )
}
