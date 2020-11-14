import orphanage from "../models/orphanage";
import image from "../models/image";

export default {
    render(orphanage: orphanage, images: image[]) {
        return {
            id: orphanage.id,
            name: orphanage.name,
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
            about: orphanage.about,
            instructions: orphanage.instructions,
            openingHours: orphanage.openingHours,
            openOnWeekends: orphanage.openOnWeekends,
            images:  images.map((image)=>{
                    return {path: `http://localhost:3333/uploads/${image.path}`}
            })

        }
    },

    renderOrphanages(orphanages: orphanage[], images: image[]){
        return orphanages.map(orphanage=>this.render(orphanage, this.filterImages(images,
            orphanage.id)))
    },

    filterImages(images: image[], id: number){
          const item = images.filter(function(item){
                     return item.orphanageId == id;
            })
        return item;
    },
};
