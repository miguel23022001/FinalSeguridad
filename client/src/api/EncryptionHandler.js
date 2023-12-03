import crypto from "crypto";

const secret = "pppppppppppppppppppppppppppppppp";

export const encrypt = (password, masterKey) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-ctr", Buffer.from(secret), iv);

  const encryptedPassword = Buffer.concat([
    cipher.update(Buffer.from(password)),
    cipher.final(),
  ]);

  return {
    iv: iv.toString("hex"),
    password: encryptedPassword.toString("hex"),
  };
};

export const decrypt = (encryption) => {
  const iv = Buffer.from(encryption.iv, "hex");
  const decipher = crypto.createDecipheriv("aes-256-ctr", Buffer.from(secret), iv);

  const decryptedPassword = Buffer.concat([
    decipher.update(Buffer.from(encryption.password, "hex")),
    decipher.final(),
  ]);

  return decryptedPassword.toString();
};
