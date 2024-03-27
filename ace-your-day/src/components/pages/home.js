import React from "react";
import './home.css';
import logo from './homepage-photos/Logo.png';
import blob from './homepage-photos/Home-blob.jpg';

const Home = () => {
    return (
        <div>
            <html>
            <head>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Digital Design</title>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link href="https://fonts.googleapis.com/css2?family=Space+Mono&display=swap" rel="stylesheet"/>
                <link rel="stylesheet" href="home.css"/>
            </head>
            <body>
            <main>
                <div class="content-left">
                    <h1>Ace. Your. Day.</h1>
                    <p>blurb blurb blurby blurb</p>
                    <li><a href="#" class="cta">Get Started Now</a></li>
                </div>
                <div class="content-right">
                    <img src={blob} alt="" class="hero-img"/>
                </div>
            </main>
            </body>
            </html>
        </div>
    )
}

export default Home;