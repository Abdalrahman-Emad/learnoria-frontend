import Cookies from "js-cookie";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";




class ApiError extends Error {
  constructor(message, status, errors = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

export const apiClient = async (endpoint, options = {}) => {
  const {
    method = "GET",
    body = null,
    isFormData = false,
    headers = {},
    ...customOptions
  } = options;

  // ✅ Get auth token from Cookies
  const token = typeof window !== "undefined" ? Cookies.get("auth-token") : null;

  // Prepare headers
  const requestHeaders = {
    ...headers,
  };

  // Add auth header if token exists
  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  // Handle different body types
  let requestBody = body;

  if (body && !isFormData) {
    // For regular JSON requests
    requestHeaders["Content-Type"] = "application/json";
    requestBody = JSON.stringify(body);
  }
  // For FormData, don't set Content-Type - let browser set it with boundary

  const requestOptions = {
    method,
    headers: requestHeaders,
    ...customOptions,
  };

  if (requestBody && method !== "GET" && method !== "HEAD") {
    requestOptions.body = requestBody;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, requestOptions);

    let data;
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const errorMessage =
        data?.message || data?.error || `HTTP ${response.status}`;
      const errors = data?.errors || null;

      throw new ApiError(errorMessage, response.status, errors);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      // ده معناه ان السيرفر رد فعلاً
      throw error;
    }

    // لو فعلاً مشكلة fetch أو سيرفر مش بيرد
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new ApiError("Cannot connect to the server. Please try again later.", 0);
    }

    // أي خطأ unexpected تاني
    throw new ApiError(error.message || "Unexpected error occurred", 0);
  }
};

//  Helper methods for common operationsAC
export const api = {
  get: (endpoint, options = {}) =>
    apiClient(endpoint, { ...options, method: "GET" }),

  post: (endpoint, data, options = {}) =>
    apiClient(endpoint, { ...options, method: "POST", body: data }),

  put: (endpoint, data, options = {}) =>
    apiClient(endpoint, { ...options, method: "PUT", body: data }),

  patch: (endpoint, data, options = {}) =>
    apiClient(endpoint, { ...options, method: "PATCH", body: data }),

  delete: (endpoint, options = {}) =>
    apiClient(endpoint, { ...options, method: "DELETE" }),

  // Specific method for file uploads
  uploadFile: (endpoint, formData, options = {}) =>
    apiClient(endpoint, {
      ...options,
      method: "POST",
      body: formData,
      isFormData: true,
    }),

  // Method for updating with files
  updateWithFiles: (endpoint, formData, options = {}) =>
    apiClient(endpoint, {
      ...options,
      method: "PUT", 
      body: formData,
      isFormData: true,
    }),
};

export default apiClient;


// import Cookies from "js-cookie";

// // Configuration
// const API_CONFIG = {
//   baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
//   timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT) || 80000,
//   maxRetries: 3,
// };

// class ApiError extends Error {
//   constructor(message, status, errors = null) {
//     super(message);
//     this.name = "ApiError";
//     this.status = status;
//     this.errors = errors;
//   }
// }

// class ApiClient {
//   constructor() {
//     this.retryCount = 0;
//   }

//   getAuthToken() {
//     if (typeof window === "undefined") return null;
//     return Cookies.get("auth-token");
//   }

//   async requestWithRetry(endpoint, options = {}) {
//     try {
//       return await this.apiClient(endpoint, options);
//     } catch (error) {
//       if (this.shouldRetry(error) && this.retryCount < API_CONFIG.maxRetries) {
//         this.retryCount++;
//         await this.delay(1000 * this.retryCount);
//         return this.requestWithRetry(endpoint, options);
//       }
//       throw error;
//     }
//   }

//   shouldRetry(error) {
//     return error.status === 0 || (error.status >= 500 && error.status < 600);
//   }

//   delay(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
//   }

//   async apiClient(endpoint, options = {}) {
//     const {
//       method = "GET",
//       body = null,
//       isFormData = false,
//       headers = {},
//       ...customOptions
//     } = options;

//     const token = this.getAuthToken();
    
//     const requestHeaders = {
//       ...(token && { Authorization: `Bearer ${token}` }),
//       ...(body && !isFormData && { "Content-Type": "application/json" }),
//       ...headers,
//     };

//     const requestBody = this.getRequestBody(method, body, isFormData);

//     const controller = new AbortController();
//     const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

//     const requestOptions = {
//       method,
//       headers: requestHeaders,
//       signal: controller.signal,
//       ...customOptions,
//       ...(requestBody && { body: requestBody }),
//     };

//     try {
//       const response = await fetch(`${API_CONFIG.baseUrl}${endpoint}`, requestOptions);
//       clearTimeout(timeoutId);

//       const data = await this.parseResponse(response);

//       if (!response.ok) {
//         throw new ApiError(
//           data?.message || `HTTP ${response.status}`,
//           response.status,
//           data?.errors
//         );
//       }

//       return data;
//     } catch (error) {
//       clearTimeout(timeoutId);
//       throw this.normalizeError(error);
//     }
//   }

//   getRequestBody(method, body, isFormData) {
//     if (method === 'GET' || method === 'HEAD' || !body) {
//       return undefined;
//     }
//     return isFormData ? body : JSON.stringify(body);
//   }

//   async parseResponse(response) {
//     const contentType = response.headers.get("content-type") || "";
    
//     if (contentType.includes("application/json")) {
//       return await response.json();
//     }
    
//     if (contentType.includes("text/")) {
//       return await response.text();
//     }
    
//     return await response.blob();
//   }

//   normalizeError(error) {
//     if (error instanceof ApiError) return error;

//     if (error instanceof TypeError) {
//       return new ApiError(
//         "Cannot connect to the server. Please try again later.",
//         0
//       );
//     }

//     if (error.name === "AbortError") {
//       return new ApiError("Request timed out. Please try again.", 0);
//     }

//     return new ApiError(error.message || "Unexpected error occurred", 0);
//   }
// }

// // Create instance
// const apiInstance = new ApiClient();

// // Create the main apiClient function that matches your hook's import
// export const apiClient = (endpoint, options = {}) => {
//   return apiInstance.apiClient(endpoint, options);
// };

// // Create convenience methods
// export const api = ["get", "post", "put", "patch", "delete"].reduce(
//   (acc, method) => {
//     acc[method] = (endpoint, data = null, options = {}) =>
//       apiInstance.requestWithRetry(endpoint, { 
//         method: method.toUpperCase(), 
//         body: data, 
//         ...options 
//       });
//     return acc;
//   },
//   {}
// );

// // File upload methods
// api.uploadFile = (endpoint, formData, options = {}) =>
//   apiInstance.requestWithRetry(endpoint, {
//     method: "POST",
//     body: formData,
//     isFormData: true,
//     ...options,
//   });

// api.updateWithFiles = (endpoint, formData, options = {}) =>
//   apiInstance.requestWithRetry(endpoint, {
//     method: "PUT",
//     body: formData,
//     isFormData: true,
//     ...options,
//   });

// // Export everything properly
// export { ApiError };
// export default apiClient;