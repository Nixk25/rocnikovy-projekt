import React from 'react'

const Hero = () => {
  return (
    <main id="home">
      <section className="flex justify-center items-center text-center h-dvh w-full">
        <div className=" bg-hero bg-center bg-no-repeat bg-cover w-full h-full ">
          <div className="w-full h-full bg-white/40">
            <h1 className="hero-headline">Vyhledejte svůj recept</h1>
            <p className="hero-desc">
              Vítejte ve světě, kde se vaření mění ve vášeň a každý pokrm je
              <span className="green">dobrodružstvím</span>. <br />
              Objevte recepty od vášnivých kuchařů jako
              <span className="green">Vy</span>. <br />
              Společně rozvíjejte chuťové hranice!
            </p>
            <div className="search">
              <input
                type="text"
                className="search-bar"
                placeholder="Vyhledejte recept ..."
              />
              <div className="search-icon">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <button className="search-btn">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Hero