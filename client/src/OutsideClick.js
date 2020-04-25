import {useEffect} from 'react';

export const OutsideClick = (ref,condition,callback)=> {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    if(condition)
                        callback();
                }
            }

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref,condition,callback]);
}