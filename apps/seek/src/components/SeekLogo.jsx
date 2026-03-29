export default function SeekLogo({ size = 'large', onClick }) {
  if (size === 'large') {
    return (
      <div onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default', userSelect: 'none' }}>
        <svg width="272" height="92" viewBox="0 0 272 92" xmlns="http://www.w3.org/2000/svg">
          <text
            fontFamily="'Inter', 'Product Sans', Arial, sans-serif"
            fontWeight="400"
            fontSize="80"
            dominantBaseline="auto"
          >
            <tspan fill="#4285f4">S</tspan>
            <tspan fill="#ea4335">e</tspan>
            <tspan fill="#fbbc04">e</tspan>
            <tspan fill="#34a853">k</tspan>
          </text>
        </svg>
      </div>
    )
  }

  // Small size for header
  return (
    <div onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default', userSelect: 'none', display: 'flex', alignItems: 'center' }}>
      <svg width="92" height="30" viewBox="0 0 92 30" xmlns="http://www.w3.org/2000/svg">
        <text
          fontFamily="'Inter', 'Product Sans', Arial, sans-serif"
          fontWeight="400"
          fontSize="26"
          dominantBaseline="auto"
        >
          <tspan fill="#4285f4">S</tspan>
          <tspan fill="#ea4335">e</tspan>
          <tspan fill="#fbbc04">e</tspan>
          <tspan fill="#34a853">k</tspan>
        </text>
      </svg>
    </div>
  )
}
