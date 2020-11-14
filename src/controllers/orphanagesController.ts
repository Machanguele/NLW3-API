import {Request, Response} from 'express'
import {getRepository} from "typeorm";
import * as yup from 'yup';

import Orphanage from "../models/orphanage";
import Image from "../models/image";
import orphanageView from '../views/orphanagesView';

export default {
    async index(request: Request, response: Response){
        const orphanagesRepository = getRepository(Orphanage);
        const imageRepository = getRepository(Image);


        const orphanages = await orphanagesRepository.find();
        const images = await imageRepository.find();

       return response.json(orphanageView.renderOrphanages(orphanages, images));
    },

    async show(request: Request, response: Response){

        const { id } = request.params;

        const orphanagesRepository = getRepository(Orphanage);
        const imageRepository = getRepository(Image);



        const orphanage = await orphanagesRepository.findOneOrFail(id);
        const image = await imageRepository.find({orphanageId: parseInt(id)})


        return response.json(orphanageView.render(orphanage, image));
    },


    create: async function (request: Request, response: Response) {

        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            openingHours,
            openOnWeekends
        } = request.body;

        const orphanageRepository = getRepository(Orphanage);

        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(
            image => {
                return {path: image.filename}
            }
        )

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            openingHours,
            openOnWeekends,
        }

        const schema = yup.object().shape({
            name: yup.string().required(),
            latitude: yup.number().required(),
            longitude: yup.number().required(),
            about: yup.string().required(),
            instructions: yup.string().required(),
            openingHours: yup.string().required(),
            openOnWeekends: yup.boolean(),
        })

        const orphanage = orphanageRepository.create(data);


        await  schema.validate(data, {
            abortEarly: false
        })
        await orphanageRepository.save(orphanage)

        const imagesRepository = getRepository(Image)


        const orphanageId = orphanage.id;


        images.map(image=>{
            {
                const img = imagesRepository.create({
                    path: image.path,
                    orphanageId
                });
                imagesRepository.save(img);


            }
        })

        return response.json(orphanage)
    }
};