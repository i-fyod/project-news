import { whiteColor } from "@/shared/const";

export function SearchIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="None" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_iconCarrier">
                <path
                    d="M11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20Z"
                    stroke={whiteColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"></path>
                <path
                    d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
                    stroke={whiteColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"></path>
            </g>
        </svg>
    );
}

export function BackIcon() {
    return (
        <svg
            viewBox="0 0 1024 1024"
            fill={whiteColor}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            stroke={whiteColor}
            strokeWidth="30">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z"></path>
            </g>
        </svg>
    );
}

export function BookmarkIcon({ filled }: { filled: boolean }) {
    return filled ? (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="">
            <g id="SVGRepo_iconCarrier">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M21 11.0975V16.0909C21 19.1875 21 20.7358 20.2659 21.4123C19.9158 21.735 19.4739 21.9377 19.0031 21.9915C18.016 22.1045 16.8633 21.0849 14.5578 19.0458C13.5388 18.1445 13.0292 17.6938 12.4397 17.5751C12.1494 17.5166 11.8506 17.5166 11.5603 17.5751C10.9708 17.6938 10.4612 18.1445 9.44216 19.0458C7.13673 21.0849 5.98402 22.1045 4.99692 21.9915C4.52615 21.9377 4.08421 21.735 3.73411 21.4123C3 20.7358 3 19.1875 3 16.0909V11.0975C3 6.80891 3 4.6646 4.31802 3.3323C5.63604 2 7.75736 2 12 2C16.2426 2 18.364 2 19.682 3.3323C21 4.6646 21 6.80891 21 11.0975ZM8.25 6C8.25 5.58579 8.58579 5.25 9 5.25H15C15.4142 5.25 15.75 5.58579 15.75 6C15.75 6.41421 15.4142 6.75 15 6.75H9C8.58579 6.75 8.25 6.41421 8.25 6Z"
                    fill="#ffffff"></path>
            </g>
        </svg>
    ) : (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
            <g id="SVGRepo_iconCarrier">
                <path
                    d="M21 16.0909V11.0975C21 6.80891 21 4.6646 19.682 3.3323C18.364 2 16.2426 2 12 2C7.75736 2 5.63604 2 4.31802 3.3323C3 4.6646 3 6.80891 3 11.0975V16.0909C3 19.1875 3 20.7358 3.73411 21.4123C4.08421 21.735 4.52615 21.9377 4.99692 21.9915C5.98402 22.1045 7.13673 21.0849 9.44216 19.0458C10.4612 18.1445 10.9708 17.6938 11.5603 17.5751C11.8506 17.5166 12.1494 17.5166 12.4397 17.5751C13.0292 17.6938 13.5388 18.1445 14.5578 19.0458C16.8633 21.0849 18.016 22.1045 19.0031 21.9915C19.4739 21.9377 19.9158 21.735 20.2659 21.4123C21 20.7358 21 19.1875 21 16.0909Z"
                    stroke="#ffffff"
                    strokeWidth="1.5"></path>
                <path d="M15 6H9" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path>
            </g>
        </svg>
    );
}

export function PersonIcon() {
    return (
        <svg viewBox="0 0 32 32" id="Layer_1" xmlns="http://www.w3.org/2000/svg" fill="#E5E6E9">
            <g id="SVGRepo_IconCarrier">
                <path
                    className="cls-1"
                    d="M22.82,20.55l-.63-.18c-1.06-.29-1.79-.51-1.91-1.75,2.83-3,2.79-5.67,2.73-8.47,0-.38,0-.76,0-1.15a7.1,7.1,0,0,0-7-7A7.1,7.1,0,0,0,9,9c0,.39,0,.77,0,1.15-.06,2.8-.1,5.45,2.73,8.47-.12,1.24-.85,1.46-1.91,1.75l-.63.18C5.61,21.74,2,25,2,29a1,1,0,0,0,2,0c0-3,3-5.61,5.82-6.55.16-.06.34-.1.52-.15A4.11,4.11,0,0,0,13.45,20a5.4,5.4,0,0,0,5.1,0,4.11,4.11,0,0,0,3.11,2.35c.18.05.36.09.52.15C25,23.39,28,26,28,29a1,1,0,0,0,2,0C30,25,26.39,21.74,22.82,20.55Zm-9.36-3C10.9,15,10.94,12.86,11,10.18,11,9.8,11,9.4,11,9A5,5,0,0,1,21,9c0,.4,0,.8,0,1.18,0,2.68.09,4.8-2.47,7.36A3.58,3.58,0,0,1,13.46,17.54Z"></path>
            </g>
        </svg>
    );
}
