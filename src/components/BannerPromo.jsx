import CardPromo from "./CardPromo";

function BannerPromocionales() {
  const imageUrls = [
    "https://www.weplay.cl/pub/media/wysiwyg/BANNER-ESTATICO-TECNO-2.png",
    "https://www.weplay.cl/pub/media/wysiwyg/BANNER-ESTATICO-PKMN_4.png",
    "https://www.weplay.cl/pub/media/wysiwyg/BANNER-ESTATICO-NINTENDO_2.png",
    "https://www.weplay.cl/pub/media/wysiwyg/BANNER-ESTATICO-JDM_1.png",
  ];

  return (
    <div className="container">
      <div className="Container-promo">
        <div className="container-promo1">
          <div>
            <CardPromo Imagen={imageUrls[0]} />
          </div>
          <div>
            <CardPromo Imagen={imageUrls[1]} />
          </div>
        </div>
        <div className="container-promo2">
          <div>
            <CardPromo Imagen={imageUrls[2]} />
          </div>
          <div>
            <CardPromo Imagen={imageUrls[3]} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BannerPromocionales;
