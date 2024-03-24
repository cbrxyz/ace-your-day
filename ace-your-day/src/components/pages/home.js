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
                <header>
                <div class="logo">
                    <img src={logo} alt="Logo" width="48px"/>
                    <li><a href="#">Ace Your Day</a></li>
                </div>
                <nav>
                    <ul>
                        <li><a href="#" class="signin-btn">Sign In with Google</a></li>
                    </ul>
                </nav>
                </header>
            <main>
                <div class="content-left">
                    <h1>Ace. Your. Day.</h1>
                    <p>blurb blurb blurby blurb</p>
                    <button class="cta">Get Started Now</button>
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