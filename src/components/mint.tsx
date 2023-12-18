"use client";

import React from "react";
import { toast } from "react-toastify";
import { Network } from "@injectivelabs/networks";
import { useForm, Resolver } from "react-hook-form";
import { BigNumberInBase } from "@injectivelabs/utils";
import { MsgSend, MsgBroadcasterWithPk } from "@injectivelabs/sdk-ts";
import testImage from "public/1.png";
import Image from "next/image";

type FormValues = {
  number: number;
  address: string;
  privateKey: string;
  dstInjectiveAddress: string;
  hexData: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.privateKey ? values : {},
    errors: !values.privateKey
      ? {
          privateKey: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  };
};

import {
  Card,
  CardHeader,
  Input,
  CardBody,
  Button,
  Image as NextImage,
} from "@nextui-org/react";

export function Mint() {
  // work with react hook form
  const { register, handleSubmit } = useForm<FormValues>({ resolver });

  const [start, setStart] = React.useState(false);

  // get form submit value
  const onSubmit = handleSubmit((data) => {
    mintHandle(data);
  });

  const mintHandle = async ({
    privateKey,
    number,
    address,
    dstInjectiveAddress,
    hexData,
  }: FormValues) => {
    setStart(() => true);
    const amount = {
      denom: "inj",
      amount: new BigNumberInBase(0.0015).toWei().toFixed(),
    };

    const msg = MsgSend.fromJSON({
      amount,
      srcInjectiveAddress: address,
      dstInjectiveAddress: dstInjectiveAddress,
    });
    for (let i = 1; i <= number; i++) {
      const txHash = await new MsgBroadcasterWithPk({
        privateKey,

        network: Network.MainnetSentry,
      }).broadcast({
        msgs: msg,
        memo: hexData,
      });

      if (txHash.txHash) {
        toast(`🦄 ${txHash.txHash}`, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      console.log(txHash.txHash);
    }
    setStart(() => false);
  };
  return (
    <Card className="w-full max-w-lg p-8">
      <CardHeader className="my-1 flex gap-6">
        <NextImage
          alt="nextui logo"
          height={48}
          radius="sm"
          src="https://pbs.twimg.com/profile_images/1736296325224996864/DssBq6FR_400x400.jpg"
          width={48}
        />
        <Image
          alt="test"
          width={50}
          height={50}
          placeholder="blur"
          src={testImage.src}
          loading="lazy"
          blurDataURL={testImage.blurDataURL}
        />
        <div className="flex flex-col">
          <p className="text-md">INJ mint</p>
          <p className="text-small text-default-500">Alpha Hunter</p>
        </div>
      </CardHeader>
      <CardBody className="">
        <form
          onSubmit={onSubmit}
          className="mt-2 flex w-full flex-col gap-6 overflow-visible py-2"
        >
          <Input
            label="你的钱包地址"
            size="lg"
            variant="faded"
            {...register("address")}
          />
          <Input
            label="私钥"
            size="lg"
            variant="faded"
            {...register("privateKey")}
          />
          <Input
            label="接收地址"
            size="lg"
            variant="faded"
            {...register("dstInjectiveAddress")}
          />
          <Input
            label="Hex Data"
            size="lg"
            variant="faded"
            {...register("hexData")}
          />
          <Input
            label="次数"
            size="lg"
            variant="faded"
            type="number"
            {...register("number")}
          />
          <Button type="submit" color="success" isLoading={start}>
            Start
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
