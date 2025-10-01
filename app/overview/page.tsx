

import React, { useState } from 'react'
import OverallTaskRect from './components/OverallTaskRect'
import { getUserTasks } from '../api/actions'



const OverviewPage = async () => {
  //TODO:: делать запрос к бд чтобы доставать задачи
  // точно отказаться от типа UserTasksCont -- идиотизм
  const userTasks = await getUserTasks()
  
  return (
    <div className='flex flex-row gap-4'>
      <div className='w-1/2'>
        <div className='flex mb-3 flex-row w-full justify-around'>
          <OverallTaskRect count={userTasks.closedRecently} caption='Project'/>
          <OverallTaskRect count={userTasks.closedRecently} caption='Completed'/>
          <OverallTaskRect count={userTasks.closedRecently} caption='Closed recently'/>
          <OverallTaskRect count={userTasks.completed} caption='Open Tickets'/>
        </div>
        <h1>My tasks</h1>

        userTas


      </div>

      <div>


      </div>
    </div>
  )
}

export default OverviewPage