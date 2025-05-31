import { banners } from "../../lib/moc";

function Banner() {
  return (
      <div className="banner">
        {banners.map((banner) => (
          <img
            key={banner.id}
            src={`/images/${banner.image}`}
            alt={banner.title}
          />
        ))}
      </div>
  );
}

export default Banner;
