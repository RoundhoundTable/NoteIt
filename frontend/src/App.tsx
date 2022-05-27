import './index.css'

const App = () => {
  return (
    <div className='font-montserrat'>
      <h1 className='text-4xl font-bold underline text-primary-500'>NoteIt</h1>
      <br/>
      <p className='text-2xl font-bold underlind text-primary-500'>Primary</p>
      <p className='text-2xl font-bold underlind text-success-500'>Success</p>
      <p className='text-2xl font-bold underlind text-info-500'>Info</p>
      <p className='text-2xl font-bold underlind text-warning-500'>Warning</p>
      <p className='text-2xl font-bold underlind text-danger-500'>Danger</p>
    </div>
  );
}

export default App;
