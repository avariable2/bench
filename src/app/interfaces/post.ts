export interface Post {
    // L'attribut key peut ne pas etre initialiser car celui-ci ne sert que pour un cas specifique :
    // celui de recuperer cette clef pour recuperer en base l'article correspondant
    key? : string; 
    titre: string;
    image: string;
    genre: any;
    description: string;
    corpsBlog: string;
    date: string;
  }
  