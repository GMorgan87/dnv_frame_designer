import { jsPDF } from "jspdf"
import html2canvas from 'html2canvas';

class PdfWriter{

    constructor(pages) {
        this.pdf = new jsPDF('p', 'mm', 'a4');
    }

     async getImages() {
         let images=[]
        for (let i = 0; i < this.pages.length; i++){
          await html2canvas(this.pages[i])
          .then((canvas) => {
            let img = canvas.toDataURL('image/png')
            images.push(img)
          })
        }
        console.log('this.images :>> ', images);
        return Promise.resolve(images)
      }

    //   addPages(images) {
    //       console.log('add pages')
    //     for (let j=0; j<images.length; j++) {
    //         if (j>0) {
    //             this.pdf.addPage('a4', 'p')
    //         }
    //     //   this.pdf.setPage(j+1)
    //       this.pdf.addImage(images[j], 'PNG', 0, 0, 210, 297, 'image', 'FAST', 0);
    //       console.log('image added')
    //       console.log(`page${j}  added`)
    //       if(j===images.length-1){
    //           this.pdf.deletePage(11)
    //           console.log('output')
    //           return Promise.resolve(1)
    //       }
    //     }
    //   }

    async getImage(page){
        html2canvas(page)
        .then((canvas) => {
            let img = canvas.toDataURL('image/png')
            return Promise.resolve(img)
        })
    }

    async addPage(page) => {
        this.getImage(page)
        .then(img => )
        this.pdf.addImage(img, 'PNG', 0, 0, 210, 297, 'image', 'FAST', 0)
        this.pdf.addPage('a4', 'p')
    }

    async createPdf(){
        console.log('creating pdf')
        for(let page of this.pages){
            this.getImage(page)
            .then(img => this.addPage(img))
        }
        this.pdf.output('dataurlnewwindow')
        }
        
        // pdf.save("download.pdf");
    
}

export default PdfWriter