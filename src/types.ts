export interface VideoGamesData {
  name: string;
  children: Children[];
}

export interface Children {
  name: string;
  children: Leaf[];
}

export interface Leaf {
  name: string;
  category: string;
  value: string;
}
