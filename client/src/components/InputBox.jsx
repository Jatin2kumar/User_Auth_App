import React from 'react'


function InputBox({ name, type, id, value, placeholder, icon }) {

    let image =
        icon === "user" ? "user.png" :
            icon === "email" ? "/email.png" :
                icon === "pass" ? "/padlock.png" :
                    "/form.png";
    return (
        <div className='relative w-[100%] mb-4'>
            <input
                name={name}
                type={type}
                defaultValue={value}
                id={id}
                placeholder={placeholder}
                className="input-box"
            />
            <img src={image} className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-auto' alt={icon} />
        </div>
    )
}

export default InputBox