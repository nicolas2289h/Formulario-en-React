import useForm from './useForm';
import '../assets/contactForm.css'

function ContactForm() {
  const initialData = {
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: '',
  }

  const onValidate = (form) => {
    let errors = {}
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    let regexComments = /^.{1,255}$/;


    if (!form.nombre.trim()) {
      errors.nombre = 'El campo Nombre no puede estar vacio.'
    } else if (!regexName.test(form.nombre)) {
      errors.nombre = 'El campo "Nombre" solo acepta letras y espacios.'
    }

    if (!form.correo.trim()) {
      errors.correo = 'El campo Email no puede estar vacio.'
    } else if (!regexEmail.test(form.correo)) {
      errors.correo = 'El campo "Correo" debe contener el caracter @ y un dominio.'
    }

    if (!form.asunto.trim()) {
      errors.asunto = 'El campo Asunto no puede estar vacio.'
    }

    if (!form.mensaje.trim()) {
      errors.mensaje = 'El campo Mensaje no puede estar vacio.'
    } else if (!regexComments.test(form.mensaje)) {
      errors.mensaje = 'El campo "Mensaje" acepta hasta 255 caracteres.'
    }

    return errors
  }

  const { form, errors, loading, handleChange, handleSubmit } = useForm(initialData, onValidate)

  return (
    <form className='form p-3' onSubmit={handleSubmit}>
      <label className='text-start' htmlFor="nombre">Nombre</label>
      <input className='form-control' type="text" id='nombre' name='nombre' value={form.nombre} onChange={handleChange} />
      {errors.nombre && <div className="alert alert-danger p-0 mt-1" role="alert">{errors.nombre}</div>}

      <label className='text-start mt-1' htmlFor="correo">Email de contacto</label>
      <input className='form-control' type="email" id='correo' name='correo' value={form.correo} onChange={handleChange} />
      {errors.correo && <div className="alert alert-danger p-0 mt-1" role="alert">{errors.correo}</div>}

      <label className='text-start mt-1' htmlFor="asunto">Asunto</label>
      <input className='form-control' type="text" id='asunto' name='asunto' value={form.asunto} onChange={handleChange} />
      {errors.asunto && <div className="alert alert-danger p-0 mt-1" role="alert">{errors.asunto}</div>}

      <label className='text-start mt-1' htmlFor="mensaje">Mensaje</label>
      <textarea className='form-control p-2 mb-1' name="mensaje" id="mensaje" cols="30" rows="6" value={form.mensaje} onChange={handleChange} ></textarea>
      {errors.mensaje && <div className="alert alert-danger p-0" role="alert">{errors.mensaje}</div>}

      <div className='w-100 text-center'>
        <button className='btn btn-success w-50 mt-2' disabled={loading}>{loading ? 'Enviando' : 'Enviar'}</button>
      </div>
    </form>
  )
}

export default ContactForm