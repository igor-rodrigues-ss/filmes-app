import { Component, ChangeDetectorRef} from '@angular/core';
import  *  as  data  from  './filmes.json';
import { NgForm } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';


interface Filme{  
    id: number;  
    nome: string;
    ano: number;
    descricao: string;
    genero: string;
    diretor: string;
    poster: string;
}  


@Component({
  selector: 'filmes-page',
  templateUrl: './filmes.html',
  styleUrls: ['./filmes.css']
})


export class FilmesPage { 
    displayedColumns: string[] = ['Nome', 'Ano', 'Diretor', 'Gênero', 'Descrição', 'Poster', 'Atualizar', 'Excluir'];
    dataSource = (data as any).default;
    filme = <Filme>{};
    posterLink: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDpYgKX6Na9EAfhKgjLD4iyPugeNE0wggdkw&usqp=CAU';

    constructor(private dc: ChangeDetectorRef) {
       this.dc = dc;
    }

    clear(): void {
        this.filme = <Filme>{};
        this.posterLink = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDpYgKX6Na9EAfhKgjLD4iyPugeNE0wggdkw&usqp=CAU';
        this.dc.detectChanges();
    }

    update(): void {
        let i = 0;
        var filmes = [...this.dataSource]
        for (i; filmes.length; i++) {
            let filme = filmes[i];
            if (this.filme.id == filme.id) {
                filmes[i] = this.filme;
                this.dataSource = filmes;
                break;
            }
            i++;
        }
    }

    onSubmit(): void {
        if (this.filme.id == null){
            let newId: number = this.dataSource[this.dataSource.length -1].id + 1;
            this.filme.id = newId;
            this.dataSource = [...this.dataSource, this.filme]
        } else {
            this.update()       
        }
        this.clear();
    }

    onUpdate(element: Filme): void{
        this.filme = { ...element };
        this.showPreview()        
    }

    showPreview(): void{
        this.posterLink = this.filme.poster;
        this.dc.detectChanges();
    }

    onDelete(filme_id: number): void{
        this.dataSource = this.dataSource.filter((item: any) => item.id !== filme_id);
        this.dc.detectChanges();
    }
} 