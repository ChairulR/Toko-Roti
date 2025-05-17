import React, { useState } from "react";
import { banners } from "../../lib/moc";

function Banner() {
  const [currentBanner, setCurrentBanner] = useState(0);
  return (
    <div
      className="banner"
      onClick={() => setCurrentBanner((currentBanner + 1) % banners.length)}
    >
      <img src={banners[currentBanner].img} alt="Promo" />
      <div className="banner-text">
        <h2>{banners[currentBanner].title}</h2>
        <p className="edition">{banners[currentBanner].subtitle}</p>
      </div>
      <div className="dots">
        {banners.map((_, i) => (
          <span
            key={i}
            className={i === currentBanner ? "dot active" : "dot"}
          />
        ))}
      </div>
    </div>
  );
}

export default Banner;
