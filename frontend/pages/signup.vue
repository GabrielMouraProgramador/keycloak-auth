<template>
  <VContainer fluid class="fill-height">
    <VRow no-gutters align="center" justify="center" class="fill-height">
      <VCol cols="12" md="6" lg="5" sm="6">
        <VRow no-gutters align="center" justify="center">
          <VCol cols="12" md="6">
            <h1>Sign Up</h1>
            <p class="text-medium-emphasis">Enter your details to get started</p>
            <div calss="h-50">
              <v-alert
                v-model="alert.active"
                :color="alert.type"
                variant="tonal"
                class="text-start"
                closable
                border="start"
                border-color="rgb(220 38 38)"
              >
                <template v-slot:default>
                  <div class="d-flex justify-start gap-2">
                    <v-icon
                      color="rgb(220 38 38)"
                      icon="mdi-alert-circle"
                      size="large"
                      class="my-auto"
                    ></v-icon>
                    <p class="my-auto text-sm md:text-base text-red-600">
                      {{ alert.text }}
                    </p>
                  </div>
                </template>
              </v-alert>
            </div>

            <VForm v-model="validationForm" class="mt-7">
              <div class="mt-1">
                <label class="label text-grey-darken-2" for="name">Company (subdomain)</label>
                <VTextField :rules="[ruleRequired]" v-model="company" id="company" name="company" />
              </div>

              <div>
                <label class="label text-grey-darken-2" for="email">Email</label>
                <VTextField
                  :rules="[ruleRequired, ruleEmail]"
                  v-model="email"
                  type="email"
                  prepend-inner-icon="fluent:mail-24-regular"
                  id="email"
                  name="email"
                />
              </div>

              <div>
                <label class="label text-grey-darken-2" for="name">Phone</label>
                <VTextField
                  :rules="[ruleRequired]"
                  v-model="phone"
                  prepend-inner-icon="fluent:phone-24-regular"
                  id="phone"
                  name="phone"
                />
              </div>
              <div class="mt-1">
                <label class="label text-grey-darken-2" for="password">Password</label>
                <VTextField
                  :rules="[ruleRequired, rulePassLen]"
                  type="password"
                  v-model="password"
                  prepend-inner-icon="fluent:password-20-regular"
                  id="password"
                  name="password"
                />
              </div>
              {{ validationForm }}
            </VForm>
            <div class="mt-5">
              <VBtn
                @click="submit()"
                :disabled="!validationForm"
                block
                min-height="45"
                class="gradient primary"
                >Create Account</VBtn
              >
            </div>
            <p class="text-body-2 mt-10">
              <span
                >Already have an account?
                <NuxtLink to="/" class="font-weight-bold text-primary">Sign In</NuxtLink></span
              >
            </p>
          </VCol>
        </VRow>
      </VCol>
      <VCol class="hidden-md-and-down fill-height" md="6" lg="7">
        <VImg
          src="https://wallpaper.dog/large/5557744.jpg"
          cover
          class="h-100 rounded-xl d-flex align-center justify-center"
        >
          <div class="text-center w-50 text-white mx-auto">
            <h2 class="mb-4">Start your journey today</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores, inventore quia.
              Dolorum dolores ad ipsum voluptatum rem, hic placeat, odio, odit numquam quod
              veritatis accusantium assumenda! Sequi, provident in! Iure!
            </p>
          </div>
        </VImg>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
const { ruleEmail, rulePassLen, ruleRequired } = useFormRules();

const validationForm = ref(false);
const email = ref("");
const company = ref("");
const password = ref("");
const phone = ref("");

const alert = ref({
  active: false,
  text: "",
  type: "",
});

const submit = async () => {
  alert.value.active = false;
  alert.value.text = "";
  alert.value.type = "error";
  try {
    const router = useRouter();
    const { error, status } = await $fetch<{
      error: string;
      status: number;
    }>("http://localhost:8000/auth/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },

      body: {
        email: email.value,
        phone: phone.value,
        companyName: company.value,
        password: password.value,
      },
    });

    if (status !== 200 && error) {
      alert.value.active = true;
      alert.value.text = error;
      alert.value.type = "error";
      return;
    }

    alert.value.active = true;
    alert.value.text = "Sua conta cadastrada com sucesso.";
    alert.value.type = "success";

    setTimeout(() => {
      router.push("/login");
    }, 1000);
  } catch (err) {
    console.log("ERROR", err);

    alert.value.active = true;
    alert.value.text = "Não foi possível completar o cadastro.";
    alert.value.type = "error";
  }
};
</script>
