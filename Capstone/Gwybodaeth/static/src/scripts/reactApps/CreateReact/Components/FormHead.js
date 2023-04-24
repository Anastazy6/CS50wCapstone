import LanguagePicker from "./LanguagePicker.js";

const htmlFormHead = () => {
  return (
    <div>

      <input  id  ="create-set-title" 
              type="text" 
              name="title" 
              size="81" 
              maxLength  ="127"
              placeholder="Title"  
              required />      


      <textarea id  ="create-set-description" 
                name="description"
                maxlenght  ="1023"  
                placeholder="Description"
      ></textarea>


      <div id="terms-lang-container">
        
        <label htmlFor="terms-lang-container">
          Terms language: 
        </label>

        <LanguagePicker
          id   ="terms-lang"
          name ="terms-lang"  
          required />
      </div>

      <div id="defs-lang-container">
        
        <label htmlFor="defs-lang-container">
          Definitions language: 
        </label>

        <LanguagePicker
          id   ="defs-lang"
          name ="defs-lang"  
          required />
      </div>


    </div>
  )
}

export default htmlFormHead;