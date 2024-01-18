export default function landingPagePlugin1(editor: any) {
  const blockManager = editor.Blocks;
  blockManager.add('Landing-Page2', {
    label: 'Landing Page 2',
    content: ` 
      <div id="incv" style="box-sizing: border-box">
      <header style="box-sizing: border-box; background-color: rgb(31, 41, 55)">
        <nav
          style="
            box-sizing: border-box;
            width: 820px;
            height: 60px;
            margin-top: 0px;
            margin-right: auto;
            margin-bottom: 0px;
            margin-left: auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <div
            class="logo"
            style="box-sizing: border-box; font-size: 23px; font-weight: 900; color: rgb(255, 255, 255)"
          >
            Header Logo
          </div>
          <ul class="links" style="box-sizing: border-box; display: flex; justify-content: flex-end">
            <li
              style="
                box-sizing: border-box;
                list-style-position: initial;
                list-style-image: initial;
                list-style-type: none;
                color: rgb(255, 255, 255);
                padding-top: 7px;
                padding-right: 25px;
                padding-bottom: 7px;
                padding-left: 25px;
                margin-top: 0px;
                margin-right: 10px;
                margin-bottom: 0px;
                margin-left: 10px;
                border-top-width: 1px;
                border-right-width: 1px;
                border-bottom-width: 1px;
                border-left-width: 1px;
                border-top-style: solid;
                border-right-style: solid;
                border-bottom-style: solid;
                border-left-style: solid;
                border-top-color: rgb(255, 255, 255);
                border-right-color: rgb(255, 255, 255);
                border-bottom-color: rgb(255, 255, 255);
                border-left-color: rgb(255, 255, 255);
                border-image-source: initial;
                border-image-slice: initial;
                border-image-width: initial;
                border-image-outset: initial;
                border-image-repeat: initial;
              "
            >
              <a
                href="#"
                style="
                  box-sizing: border-box;
                  text-decoration-line: none;
                  text-decoration-thickness: initial;
                  text-decoration-style: initial;
                  text-decoration-color: initial;
                  color: inherit;
                "
                >link one</a
              >
            </li>
            <li
              style="
                box-sizing: border-box;
                list-style-position: initial;
                list-style-image: initial;
                list-style-type: none;
                color: rgb(255, 255, 255);
                padding-top: 7px;
                padding-right: 25px;
                padding-bottom: 7px;
                padding-left: 25px;
                margin-top: 0px;
                margin-right: 10px;
                margin-bottom: 0px;
                margin-left: 10px;
                border-top-width: 1px;
                border-right-width: 1px;
                border-bottom-width: 1px;
                border-left-width: 1px;
                border-top-style: solid;
                border-right-style: solid;
                border-bottom-style: solid;
                border-left-style: solid;
                border-top-color: rgb(255, 255, 255);
                border-right-color: rgb(255, 255, 255);
                border-bottom-color: rgb(255, 255, 255);
                border-left-color: rgb(255, 255, 255);
                border-image-source: initial;
                border-image-slice: initial;
                border-image-width: initial;
                border-image-outset: initial;
                border-image-repeat: initial;
              "
            >
              <a
                href="#"
                style="
                  box-sizing: border-box;
                  text-decoration-line: none;
                  text-decoration-thickness: initial;
                  text-decoration-style: initial;
                  text-decoration-color: initial;
                  color: inherit;
                "
                >link two</a
              >
            </li>
            <li
              style="
                box-sizing: border-box;
                list-style-position: initial;
                list-style-image: initial;
                list-style-type: none;
                color: rgb(255, 255, 255);
                padding-top: 7px;
                padding-right: 25px;
                padding-bottom: 7px;
                padding-left: 25px;
                margin-top: 0px;
                margin-right: 10px;
                margin-bottom: 0px;
                margin-left: 10px;
                border-top-width: 1px;
                border-right-width: 1px;
                border-bottom-width: 1px;
                border-left-width: 1px;
                border-top-style: solid;
                border-right-style: solid;
                border-bottom-style: solid;
                border-left-style: solid;
                border-top-color: rgb(255, 255, 255);
                border-right-color: rgb(255, 255, 255);
                border-bottom-color: rgb(255, 255, 255);
                border-left-color: rgb(255, 255, 255);
                border-image-source: initial;
                border-image-slice: initial;
                border-image-width: initial;
                border-image-outset: initial;
                border-image-repeat: initial;
              "
            >
              <a
                href="#"
                style="
                  box-sizing: border-box;
                  text-decoration-line: none;
                  text-decoration-thickness: initial;
                  text-decoration-style: initial;
                  text-decoration-color: initial;
                  color: inherit;
                "
                >link three</a
              >
            </li>
          </ul>
        </nav>
      </header>
      <main style="box-sizing: border-box">
        <section
          class="cover"
          style="
            box-sizing: border-box;
            background-color: rgb(31, 41, 55);
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          <div
            class="cover-left"
            style="
              box-sizing: border-box;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
              width: 350px;
              height: 500px;
              padding-top: 20px;
              padding-right: 20px;
              padding-bottom: 20px;
              padding-left: 20px;
            "
          >
            <h1
              style="
                box-sizing: border-box;
                color: rgb(255, 255, 255);
                font-size: 45px;
                font-weight: bolder;
                margin-bottom: 0px;
              "
            >
              This website is awesome
            </h1>
            <p style="box-sizing: border-box; color: rgb(204, 204, 204)">
              This website has some subtext that goes under the main title. It&#039;s smaller font and
              the color is lower contrast
            </p>
            <button
              class="cover-button"
              style="
                box-sizing: border-box;
                text-decoration-line: none;
                text-decoration-thickness: initial;
                text-decoration-style: initial;
                text-decoration-color: initial;
                font-weight: 600;
                font-family: 'Josefin Sans', sans-serif;
                color: rgb(255, 255, 255);
                background-color: rgb(56, 130, 246);
                border-top-width: initial;
                border-right-width: initial;
                border-bottom-width: initial;
                border-left-width: initial;
                border-top-style: none;
                border-right-style: none;
                border-bottom-style: none;
                border-left-style: none;
                border-top-color: initial;
                border-right-color: initial;
                border-bottom-color: initial;
                border-left-color: initial;
                border-image-source: initial;
                border-image-slice: initial;
                border-image-width: initial;
                border-image-outset: initial;
                border-image-repeat: initial;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
                border-bottom-left-radius: 5px;
                padding-top: 7px;
                padding-right: 25px;
                padding-bottom: 7px;
                padding-left: 25px;
              "
            >
              Sign up
            </button>
          </div>
          <div style="box-sizing: border-box">
            <img
              src="https://picsum.photos/id/16/400/250"
              alt=""
              class="cover-img"
              style="box-sizing: border-box"
            />
          </div>
        </section>
        <section
          class="more-info"
          style="
            box-sizing: border-box;
            background-color: rgb(255, 255, 255);
            height: 350px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          "
        >
          <h2 style="box-sizing: border-box; font-size: 30px; margin-bottom: 30px">
            Some random information
          </h2>
          <div
            class="cards"
            style="
              box-sizing: border-box;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 600px;
            "
          >
            <div
              class="card"
              style="
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                width: 150px;
              "
            >
              <img
                src="https://picsum.photos/id/2/120/120"
                alt=""
                class="card-img"
                style="
                  box-sizing: border-box;
                  border-top-left-radius: 10px;
                  border-top-right-radius: 10px;
                  border-bottom-right-radius: 10px;
                  border-bottom-left-radius: 10px;
                "
              />
              <p style="box-sizing: border-box; font-size: 13px">some description for the image</p>
            </div>
            <div
              class="card"
              style="
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                width: 150px;
              "
            >
              <img
                src="https://picsum.photos/id/1080/120/120"
                alt=""
                class="card-img"
                style="
                  box-sizing: border-box;
                  border-top-left-radius: 10px;
                  border-top-right-radius: 10px;
                  border-bottom-right-radius: 10px;
                  border-bottom-left-radius: 10px;
                "
              />
              <p style="box-sizing: border-box; font-size: 13px">some description for the image</p>
            </div>
            <div
              class="card"
              style="
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                width: 150px;
              "
            >
              <img
                src="https://picsum.photos/id/1010/120/120"
                alt=""
                class="card-img"
                style="
                  box-sizing: border-box;
                  border-top-left-radius: 10px;
                  border-top-right-radius: 10px;
                  border-bottom-right-radius: 10px;
                  border-bottom-left-radius: 10px;
                "
              />
              <p style="box-sizing: border-box; font-size: 13px">some description for the image</p>
            </div>
            <div
              class="card"
              style="
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                width: 150px;
              "
            >
              <img
                src="https://picsum.photos/id/1025/120/120"
                alt=""
                class="card-img"
                style="
                  box-sizing: border-box;
                  border-top-left-radius: 10px;
                  border-top-right-radius: 10px;
                  border-bottom-right-radius: 10px;
                  border-bottom-left-radius: 10px;
                "
              />
              <p style="box-sizing: border-box; font-size: 13px">some description for the image</p>
            </div>
          </div>
        </section>
        <section
          class="quote"
          style="
            box-sizing: border-box;
            background-color: rgb(221, 221, 221);
            height: 350px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          "
        >
          <p
            class="quote-text"
            style="
              box-sizing: border-box;
              width: 700px;
              margin-bottom: 15px;
              font-size: 40px;
              font-weight: 100;
              font-style: italic;
              line-height: 40px;
            "
          >
            &quot;This is an inspiring quote This is an inspiring quote This is an inspiring quote This
            is an inspiring quote This is an inspiring quote This is an inspiring quote&quot;
          </p>
          <span class="quote-author" style="box-sizing: border-box; margin-left: 550px"
            >Thor, God of Thunder</span
          >
        </section>
        <section
          class="call-to-action"
          style="
            box-sizing: border-box;
            background-color: rgb(255, 255, 255);
            height: 200px;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          <div
            class="cta-container"
            style="
              box-sizing: border-box;
              background-color: rgb(56, 130, 246);
              width: 700px;
              height: 90px;
              border-top-left-radius: 7px;
              border-top-right-radius: 7px;
              border-bottom-right-radius: 7px;
              border-bottom-left-radius: 7px;
              display: flex;
              justify-content: center;
              align-items: center;
            "
          >
            <div class="cta-text" style="box-sizing: border-box; width: 500px; margin-right: 50px">
              <h3
                style="
                  box-sizing: border-box;
                  color: rgb(255, 255, 255);
                  font-size: 17px;
                  margin-bottom: 0px;
                "
              >
                Call to action! It&#039;s time!
              </h3>
              <p
                style="
                  box-sizing: border-box;
                  color: rgba(255, 255, 255, 0.6);
                  margin-top: 5px;
                  font-size: 12px;
                "
              >
                This is some text for cta This is some text for cta This is some text for cta
              </p>
            </div>
            <button
              class="cta-button"
              style="
                box-sizing: border-box;
                text-decoration-line: none;
                text-decoration-thickness: initial;
                text-decoration-style: initial;
                text-decoration-color: initial;
                font-weight: 400;
                font-family: 'Josefin Sans', sans-serif;
                color: rgb(255, 255, 255);
                background-color: rgb(56, 130, 246);
                border-top-width: 1px;
                border-right-width: 1px;
                border-bottom-width: 1px;
                border-left-width: 1px;
                border-top-style: solid;
                border-right-style: solid;
                border-bottom-style: solid;
                border-left-style: solid;
                border-top-color: rgb(255, 255, 255);
                border-right-color: rgb(255, 255, 255);
                border-bottom-color: rgb(255, 255, 255);
                border-left-color: rgb(255, 255, 255);
                border-image-source: initial;
                border-image-slice: initial;
                border-image-width: initial;
                border-image-outset: initial;
                border-image-repeat: initial;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
                border-bottom-left-radius: 5px;
                padding-top: 7px;
                padding-right: 25px;
                padding-bottom: 7px;
                padding-left: 25px;
              "
            >
              Sign up
            </button>
          </div>
        </section>
      </main>
      <footer
        style="
          box-sizing: border-box;
          background-color: rgb(31, 41, 55);
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        <p
          class="copyright"
          style="box-sizing: border-box; color: rgb(255, 255, 255); font-size: 15px; font-weight: 100"
        >
          Copyright @ The Odin Project 2022
        </p>
      </footer>
    </div>
    `,
    category: 'Landing Page',
    attributes: {
      title: 'Landing Page 2',
    },
  });
}
