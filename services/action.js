import Action from '../models/action.js';
import { ACTIONS } from '../config.js';

export const getAll = async () => {
  return await Action.find({});
};

export const defineAction = async (actionn) => {
  let ACTION = {};
  ACTIONS.forEach((action) => {
    if (actionn === action.id) {
      ACTION = action;
    }
  });
  return ACTION;
};

export const getActionByEmail = async (email) => {
  return Action.find({ email });
};

export const updateAction = async (email, actionn) => {
  try {
    const existingAction = await getActionsByDate(new Date(), email);

    if (!existingAction) {
      return null;
    }

    existingAction[0].action = await defineAction(actionn);
    const result = await existingAction[0].save();

    return result;
  } catch (error) {
    console.error(error);
    throw new Error('Internal Server Error');
  }
};

export const getActionsByDate = async (date, email) => {
  const init = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const fin = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

  const actions = await Action.find({
    date: {
      $gte: init,
      $lt: fin,
    },
    email,
  });

  return actions;
};
