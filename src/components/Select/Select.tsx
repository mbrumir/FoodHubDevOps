import React from "react";

const BasicSelect = (props: any) => {
    const handleSelectChange = (event: any) => {
        const selectedValue = event.target.value;
        if (props.change) {
            props.change(selectedValue);
        }
    };

    return (
        <div className={`select ${props.class}`}>
            <select defaultValue={props.title} onChange={handleSelectChange}>

                <option value={props.title}>{props.title}</option>

                {props.options.map((option: any, index: any) => (
                    <option key={index} value={option.value}>{option.name}</option>
                    ))}

            </select>
        </div>
    );
}

export default BasicSelect;
