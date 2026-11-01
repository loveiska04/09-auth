import css from './SearchBox.module.css';

interface SearchBoxProps {
  onSearch: (value: string) => void;
}

export default function SearchBox({onSearch}: SearchBoxProps) {
const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  onSearch(event.target.value);
}

  return (
    <div>
      SearchBox
      <input className={css.input} type="text" placeholder="Search notes" onChange={handleInputChange}/>
    </div>
  );
}