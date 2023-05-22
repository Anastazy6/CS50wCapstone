function StudyItem() {
  return (
    <div>
      
      <div className="create-item-index-bullet
                      bg-lleuad 
                      text-lleuad-lawn">
      </div>
    
      <div className="create-item-container">
        <textarea className   ="term-input 
                                      create-item-input"
                  name        ="term" 
                  placeholder ="Enter term"
                  required  
        ></textarea>
    
    
        <textarea className   ="definition-input 
                                create-item-input"
                  name        ="definition"
                  placeholder ="Enter definition"
                  required
        ></textarea>
    
    
        <textarea className   ="category-input 
                                create-item-input"
                  name        ="category"
                  placeholder ="Enter category"
        ></textarea>
    
    
        <textarea className   ="notes-input 
                                create-item-input"
                  name        ="notes"
                  placeholder ="Enter notes"
        ></textarea>
      </div>
    </div>
  )
}

export default StudyItem;


