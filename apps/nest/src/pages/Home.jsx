import { listings } from '../data/listings'
import ListingCard from '../components/ListingCard'

export default function Home() {
  return (
    <div style={{ paddingTop: '152px', minHeight: '100vh', background: '#ffffff' }}>
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '32px 24px 64px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
          }}
        >
          {listings.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  )
}
