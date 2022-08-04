import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import throttle from 'lodash.throttle';
import './App.css';

/**
 * @param height {number}
 * @return {number}
 */
const calculateHeightByAnotherElem = (height) => height / 2;

/**
 * @param height {number}
 * @param windowWidth {number} - window.innerWidth for example
 * @return {number}
 */
const modifyHeightByResize = (height, windowWidth) => {
    const coefficient = windowWidth / 500;

    return height / coefficient;
}

function App() {
    const [height, setHeight] = useState(null);
    const ref = useRef(null);

    // initial set elem height. We should add ref.current to the dependencies array to be confident that we have DOM elem in our ref
    useLayoutEffect(() => {
        if (ref.current) {
            setHeight(modifyHeightByResize(calculateHeightByAnotherElem(ref.current.getBoundingClientRect()?.height), window.innerWidth));
        }
    }, [ref.current])

    // set resize listener
    useEffect(() => {
        const handleResize = throttle(() => {
            setHeight(modifyHeightByResize(calculateHeightByAnotherElem(ref.current.getBoundingClientRect()?.height), window.innerWidth));
        }, 100)

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])



  return (
    <section className="App">
        <div className="targetElem" ref={ref}>I HAVE HEIGHT FROM CSS</div>
        <div style={{ height }} className="elem">I HAVE DYNAMIC HEIGHT</div>
    </section>
  );
}

export default App;
