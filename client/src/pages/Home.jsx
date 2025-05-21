import React from 'react';
import Header from "../components/Header";
import Intro from "../sections/Home/Intro"


export default function Home(){
    return(
    <div className='min-h-screen flex flex-col'>
        <Header/>
        <main className='flex flex-1 items-center justify-center px-6'>
            <Intro/>
        </main>
    </div>)
}   