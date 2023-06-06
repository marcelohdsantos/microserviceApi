import { Request, Response } from "express";
import { IAccount } from "../models/account";
import repository from "../models/accountModel";
import auth from "../auth";

const accounts: IAccount[] = [];

async function getAccounts(req: Request, res: Response, next: any) {
  const accounts = await repository.findAll();
  res.json(accounts.map(item => {
    item.password = ''; // segurança para não retornar a linha do password na hora da consulta.
    return item;
  }));
}

async function getAccount(req: Request, res: Response, next: any) {
  try {
    const id = parseInt(req.params.id);

    // if (!id) return res.status(400).end(); //se o id for diferente de qualquer coisa que não seja um número.

    if (!id) throw new Error("Id is invalid format.");

    const account = await repository.findById(id);

    if (account === null) {
      return res.status(404).end();
    } else {
      account.password = '';
      return res.json(account);
    }
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}

async function addAccount(req: Request, res: Response, next: any) {
  try {
    const newAccount = req.body as IAccount;
    newAccount.password = auth.hasPassword(newAccount.password);
    const result = await repository.add(newAccount);
    accounts.push(newAccount);
    res.status(201).json(newAccount);
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}

async function setAccount(req: Request, res: Response, next: any) {
  try {
    const accountId = parseInt(req.params.id);
    if(!accountId) throw new Error('ID is in valid format.');
    const accountParams = req.body as IAccount;
    const updateAccount = await repository.set(accountId, accountParams);
    updateAccount.password = '';    
    res.status(200).json(updateAccount);
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

function logoutAccount(req: Request, res: Response, next: any) {
  res.json({  auth: false, token: null  });
}

export default {
  getAccounts,
  getAccount,
  addAccount,
  setAccount,
  loginAccount,
  logoutAccount
};
