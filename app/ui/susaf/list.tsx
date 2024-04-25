import { Impact } from '@/app/lib/definitions';
// import React from 'react';

//should get a list of type Impact
export function ImpactList ({impacts}:{impacts:any[]}) {
   return(
    <div>{
        impacts.map((impact:any, index:number) => {
            return <h1 key={index}>
                {impact.get('title')}
            </h1>
        }
        
        ) 
        }
      
    </div>

   ) 
};
