import React, { useState } from 'react'

function useForm(initialData, onValidate) {
    const [form, setForm] = useState(initialData)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const err = onValidate(form)
        setErrors(err)
        // console.log(Object.keys(err).length);

        if (Object.keys(err).length == 0) { 
            setLoading(true)

            fetch("https://formsubmit.co/ajax/nicolas2289h@gmail.com", { //envio del formulario
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(form)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    data.success && setForm(initialData);
                    setLoading(false)
                })
                .catch(error => {
                    console.log(error)
                    setLoading(false)
                });
        }
    }

    return { form, loading, errors, handleChange, handleSubmit }
}

export default useForm