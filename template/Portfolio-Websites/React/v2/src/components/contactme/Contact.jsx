import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

function ContactForm() {
  const [state, handleSubmit] = useForm("<your formSpree id>");
  
  if (state.succeeded) {
      return <p style={{ color: 'green', textAlign: 'center' }}>message sent!</p>;
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      style={{
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        // backgroundColor: 'white',
        // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <div>
        <input
          id="email"
          type="email" 
          name="email"
          placeholder='email'
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #CCCCCC',
            borderRadius: '4px',
            // backgroundColor: '#ffe5e5', // Similar to Tailwind's bg-red-200
            backgroundColor: '#212121',
            outline: 'none',
            fontSize: '14px',
          }}
        />
        <ValidationError 
          prefix="Email" 
          field="email"
          errors={state.errors}
          style={{
            color: 'red',
            fontSize: '12px',
            marginTop: '5px',
          }}
        />
      </div>
      
      <div>
        <textarea
          id="message"
          name="message"
          placeholder='your message'
          style={{
            backgroundColor: '#212121',
            width: '100%',
            padding: '5px',
            border: '1px solid #CCCCCC',
            borderRadius: '4px',
            // backgroundColor: '#F7F7F7',
            outline: 'none',
            fontSize: '14px',
            minHeight: '70px',
            color: 'white'
          }}
        />
        <ValidationError 
          prefix="Message" 
          field="message"
          errors={state.errors}
          style={{
            color: 'red',
            fontSize: '12px',
            marginTop: '5px',
          }}
        />
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <button 
          type="submit" 
          disabled={state.submitting}
          style={{
            backgroundColor: state.submitting ? '#3e9391' : '#2399C4',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '4px',
            cursor: state.submitting ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            border: 'none',
            outline: 'none',
          }}
        >
          {state.submitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
}

export default ContactForm;
