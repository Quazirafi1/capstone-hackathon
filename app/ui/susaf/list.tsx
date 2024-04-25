import { Impact } from '@/app/lib/definitions';
import React from 'react';

//should get a list of type Impact
export default function ImpactList ({impacts}:{impacts:any[]}) {
   return(
    <div>{
        impacts.map((impact:Impact) => {
            impact;
            return <h1>
                impact.title
            </h1>
        }

        ) 
        }
      
    </div>

   ) 
};
