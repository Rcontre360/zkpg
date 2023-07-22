import {createAsyncThunk} from "@reduxjs/toolkit";
import * as actions from "@redux/constants";
import {
  getAttestation,
  getModificationAttestationEncoder,
  getPublishAttestationEncoder,
} from "@shared/utils/eas";

export const onAddPublishAttestation = createAsyncThunk<
  {type: "publish"; data: any},
  {
    uid: string;
  },
  {rejectValue: any}
>(actions.PUBLISH_ATTESTATION, async (args) => {
  const {uid} = args;
  try {
    const attestation = await getAttestation(uid);
    const encoder = getPublishAttestationEncoder();

    const decoded = encoder.decodeData(attestation.data);
    return {type: "publish", data: decoded};
  } catch (err) {
    console.log("erro", err.message);
    return null;
  }
});

export const onAddModifyAttestation = createAsyncThunk<
  {type: "modify"; data: any},
  {
    uid: string;
  },
  {rejectValue: any}
>(actions.MODIFY_ATTESTATION, async (args) => {
  const {uid} = args;
  try {
    const attestation = await getAttestation(uid);
    const encoder = getModificationAttestationEncoder();

    const decoded = encoder.decodeData(attestation.data);
    return {type: "modify", data: decoded};
  } catch (err) {
    console.log("erro", err.message);
    return null;
  }
});
