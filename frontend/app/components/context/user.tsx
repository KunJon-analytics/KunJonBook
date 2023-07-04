"use client";

import React from "react";
import { ApolloConsumer } from "@apollo/client";
import { backendUrl } from "@/app/constants";

export const user = {
  username: "Test User",
  avatar: `${backendUrl}/uploads/avatar1.png`,
  id: -1,
};

export const UserConsumer = ({ children }: { children: any }) => {
  return (
    <ApolloConsumer>
      {(client) => {
        // Use client.readQuery to get the current logged in user.

        return React.Children.map(children, function (child) {
          return React.cloneElement(child, { user });
        });
      }}
    </ApolloConsumer>
  );
};
