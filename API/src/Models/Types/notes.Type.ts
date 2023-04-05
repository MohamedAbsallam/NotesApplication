/*  
  [NOTE TYPE ]

  *** id            => Note Id                 (SERIAL PRIMARY KEY)   
  *** text          => Note Title              (VARCHAR 255)
  *** note          => Note Body               (VARCHAR 255)
  *** public        => Note Security           (BOOLEAN)
  *** created_date  => Note created Date       (DATE)
  *** user_id       => Note Created user       (FORIGEN KEY)
*/
type Note = {
  id?: number;
  text: string;
  note: string;
  public: boolean;
  created_date?: string;
  user_id?: number;
};

export default Note;
