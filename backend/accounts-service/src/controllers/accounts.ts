import { Request, Response } from "express";
import { IAccount } from "../models/account";

const accounts: IAccount[] = [];

function getAccounts(req: Request, res: Response, next: any) {
  res.json(accounts);
}

function getAccount(req: Request, res: Response, next: any) {
  try {
    const id = parseInt(req.params.id);

    // if (!id) return res.status(400).end(); //se o id for diferente de qualquer coisa que não seja um número.

    if (!id) throw new Error("Id is invalid format.");

    const index = accounts.findIndex((item) => item.id === id);

    if (index === -1) {
      return res.status(404).end();
    } else {
      return res.json(accounts[index]);
    }
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}

function addAccount(req: Request, res: Response, next: any) {
  try {
    const newAccount = req.body as IAccount;
    accounts.push(newAccount);
    res.status(201).json(newAccount);
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}

function setAccount(req: Request, res: Response, next: any) {
  try {
    const accountId = parseInt(req.params.id);

    if(!accountId) throw new Error('ID is in valid format.');

    const accountParams = req.body as IAccount;
    const index = accounts.findIndex((item) => item.id === accountId);
    const originalAccount = accounts[index];

    if(index === -1) return res.status(404).end();

    if (accountParams.name) 
      originalAccount.name = accountParams.name;

    if (accountParams.password)
      originalAccount.password = accountParams.password;

    accounts[index] = originalAccount;
    res.status(200).json(originalAccount);
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}

function loginAccount(req: Request, res: Response, next: any) {
  try {
    const loginParams = req.body as IAccount;
    const index = accounts.findIndex(item => item.email === loginParams.email && item.password === loginParams.password);
    if(index === -1) res.status(401).end();

    res.json({  auth: true, token: {} })

  } catch (error) {
    console.error(error);
    res.status(400).end();
  }
}

export default {
  getAccounts,
  getAccount,
  addAccount,
  setAccount,
  loginAccount
};
