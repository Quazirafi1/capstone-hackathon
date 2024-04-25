import { Impact } from '@/app/lib/definitions';
import React from 'react';

//should get a list of type Impact
export default function ImpactList ({impacts}:{impacts:any[]}) {
   return(
    <div>{
        impacts.map((impact:any) => {
            return <h1>
                {impact.get('title')}
            </h1>
        }
        
        ) 
        }
      
    </div>

   ) 
};
